import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import academic from "@/app/assets/landing/academic.png"
import it from "@/app/assets/landing/it.png"
import lifestyle from "@/app/assets/landing/lifestyle.png"
import professional from "@/app/assets/landing/professional.png"

export function OurSubjects() {

  return (
    <div className="bg-off-white pt-8 text-blue pb-6">
      <div className="max-w-7xl w-11/12 m-auto">
        <h2 className="text-2xl text-center mb-12">Our Subjects</h2>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          data-cy="landingOurSubjectsSectionItems"
        >

          <Link className="group pb-10" href={{ pathname: "/company/subjects/academic" }}>
            <h5 className="text-center pb-2 group-hover:font-semibold group-hover:tracking-wider">
              Academic
            </h5>

            <Image
              src={academic}
              alt="Academic Subjects Image"
              width="267"
              height="291"
              className="mx-auto transition ease-in-out duration-300 group-hover:scale-105"
            />
          </Link>

          <Link className="group pb-10" href={{ pathname: "/company/subjects/it" }}>
            <h5 className="text-center pb-2 group-hover:font-semibold group-hover:tracking-wider">
              IT
            </h5>

            <Image
              src={it}
              alt="IT Subjects Image"
              width="267"
              height="291"
              className="mx-auto transition ease-in-out duration-300 group-hover:scale-105"
            />
          </Link>

          <Link className="group pb-10" href={{ pathname: "/company/subjects/lifestyle" }}>
            <h5 className="text-center pb-2 group-hover:font-semibold group-hover:tracking-wider">
              Lifestyle
            </h5>

            <Image
              src={lifestyle}
              alt="Lifestyle Subjects Image"
              width="267"
              height="291"
              className="mx-auto transition ease-in-out duration-300 group-hover:scale-105"
            />
          </Link>

          <Link className="group pb-10" href={{ pathname: "/company/subjects/professional" }}>
            <h5 className="text-center pb-2 group-hover:font-semibold group-hover:tracking-wider">
              Professional
            </h5>

            <Image
              src={professional}
              alt="Professional subjects image"
              width="266"
              height="291"
              className="mx-auto transition ease-in-out duration-300 group-hover:scale-105"
            />
          </Link>

        </div>
        <div className="my-4 flex items-center justify-center">
          <Button asChild variant="blueOutline" >
            <Link href="/company/subjects/all">
              View all Subjects
            </Link>
          </Button>
          </div>
      </div>
    </div>
  );
}
