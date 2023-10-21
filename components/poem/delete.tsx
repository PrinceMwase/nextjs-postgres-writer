import toast from "react-hot-toast";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "./confirmationModal";
import DeleteIcon from "../svg/DeleteIcon";

type DType = {
  id: number;
  color: "#000000" | "#ffffff";
};

export default function Delete({ id, color }: DType) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const request = async function deletePoem() {
    fetch("/api/poem/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        poemId: id,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        toast.success("Deleted successfully");
        router.refresh();

        router.push("/");
      } else {
        toast.error("failed to delete");
      }
      setIsModalVisible(false);
    });
  };

  return (
    <span style={{ color }} className="cursor-pointer">
      <DeleteIcon onClick={() => setIsModalVisible(true)} />
      {isModalVisible && (
        <ConfirmationModal
          onCancel={() => {
            console.log("canceling");

            setIsModalVisible(false);
          }}
          onConfirm={request}
        />
      )}
    </span>
  );
}
