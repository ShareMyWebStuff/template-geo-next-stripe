import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
    className="bg-blue pt-8 text-white-800"
    data-cy="footer"
  >
    <div className="m-auto max-w-7xl w-11/12">
      <div className="grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 grid-rows-1">
        <div className="sm:col-span-2" data-cy="mission">
          <div className={"inline-block hover:cursor-pointer" }>
            <Logo session={null}/>
          </div>
          <p className="py-4 text-lg">Empowering students to achieve more</p>

        </div>

        <div>
          <h6 className="pt-4 sm:pt-0 pb-2 text-xl">Company</h6>
          <ul className={`list-none [&_li]:decoration-1 [&_li]:underline-offset-4 [&_li:hover]:underline text-sm `}>
            <li>
              <Link
                href={{ pathname: "/company/legal/terms" }}>
                Terms
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/company/legal/privacy"}}
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/company/legal/cookies"}}
              >
                Cookie
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/company/legal/safeguarding" }}
              >
                Safeguarding
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/company/faqs", query: { } }}
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/company/contact-us", query: { } }}>Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="pt-4 sm:pt-0 pb-2 text-xl">Services</h6>
          <ul className={`list-none [&_li]:decoration-1 [&_li]:underline-offset-4 [&_li:hover]:underline text-sm `}>
            <li>
              <Link 
                href="/tutor-search">Tutor Search
              </Link>
            </li>
            <li>
              <Link 
                href="/">Search Student Ads
              </Link>
            </li>
            <li>
              <Link 
                href="/">Question &amp; Answers</Link>
            </li>
            <li>
              <Link 
                href="/">Knowledge Centre</Link>
            </li>
            <li>
              <Link 
                href="/">Courses</Link>
            </li>
            <li>
              <Link 
                href="/">Study Buddies</Link>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="pt-4 sm:pt-8 lg:pt-0 pb-2 text-xl">Popular Subjects</h6>
          <ul className={`list-none [&_li]:decoration-1 [&_li]:underline-offset-4 [&_li:hover]:underline text-sm `}>
            <li>
              <Link
                href={{
                  pathname: "/tutor-search",
                  query: { subject: "Maths" },
                }}
              >
                Maths
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/tutor-search",
                  query: { subject: "English" },
                }}
              >
                English
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/tutor-search",
                  query: { subject: "Biology" },
                }}
              >
                Biology
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/tutor-search",
                  query: { subject: "Chemistry" },
                }}
              >
                Chemistry
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/tutor-search",
                  query: { subject: "Physics" },
                }}
              >
                Physics
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/tutor-search",
                  query: { subject: "French" },
                }}
              >
                French
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="mt-8 py-8 px-0 border-t-2 border-page-header-fg border-solid"
        data-cy="copyright"
      >
        <p className="text-center text-my-off-white">
          Copyright © 2015 - {year} Cameron and Guy Limited
        </p>
      </div>
    </div>
  </footer>

  )
}
