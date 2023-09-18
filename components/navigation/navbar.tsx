import Link from "next/link";

export default function NavBar({ page }: { page: string }) {

  const navList: string[] = ["home", "about", "career", "faq", "contact"];

  return (
    <div className="py-4 text-button-color font-medium">
      <ul>
        {navList.map((value) => {
          return (
            <li className={`inline mx-4 ${value === page ? "border-b-2" : ""}`}>
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
