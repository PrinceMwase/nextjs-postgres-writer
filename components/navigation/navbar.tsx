import Link from "next/link";

export default function NavBar({ page }: { page: string }) {

  const navList: string[] = ["home", "about"];

  return (
    <div className="py-4 text-button-color font-medium">
      <ul>
        {navList.map((value, index) => {
          return (
            <li className={`inline mx-4 ${value === page ? "border-b-2" : ""}`} key={index} >
              {" "}
              <Link href={`/${value}`} className="capitalize">
                {value}
              </Link>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
