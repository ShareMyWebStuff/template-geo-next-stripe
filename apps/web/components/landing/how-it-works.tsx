// import {Card, CardHeader, CardBody} from "@heroui/react";
import Image, { StaticImageData } from "next/image";
import { FaHandPointRight } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import selectTutorImg from "@/app/assets/landing/select-tutor.png"
import bookLessonImg from "@/app/assets/landing/reserve.png"
import feedbackImg from "@/app/assets/landing/feedback.png"

type HowItWorksItem = {
  img: StaticImageData;
  altImg: string;
  header: string;
  items: string[]
}

const workItems: {[key: string]: HowItWorksItem} = {
  'SelectTutor': {
    img: selectTutorImg,
    altImg: 'Select tutor icon',
    header: 'Select a Tutor',
    items: [
      'Search our tutors by subjects and level',
      `See tutors availibility verses your's`,
      'Check tutors reviews',
      'Any questions - message the tutor directly'
    ]
  },
  'BookLesson': {
    img: bookLessonImg,
    altImg: 'Book lesson icon',
    header: 'Book Your Lesson',
    items: [
      'Found a tutor with availability',
      `Book lessons online at set frequencies whether its a one off or every week`,
      'Arrange payment terms with tutor',
      'Start learning'
    ]
  },
  'Feedback': {
    img: feedbackImg,
    altImg: 'Lesson feedback icon',
    header: 'Lesson Feedback',
    items: [
      'View what was covered in the lesson',
      `See resources applicable to the lesson`,
      'See homework set',
      'See homework markings',
      `View tutor's feedback on your childs progress and attitude`,
      'Plus much more'
    ]
  }
}

const HowItWorksCard = ( {item }: { item: string }) => {

  const { img, altImg, items } = workItems[item];

  return (
    <Card>
      <CardTitle className="flex flex-row items-center">
        <Image
          src={img}
          alt={altImg}
          width={64}
          height={64}
          quality={75}
          className="h-16 w-16"
        />
        <h3 className="text-xl font-semibold">Select a Tutor</h3>
      </CardTitle>

      <CardContent className="h-52">
        <ul>
          {
            items.map( (item, idx) => 
              <li key={idx} className="my-2">
                <FaHandPointRight className="inline-block text-gold mr-2" size={20}/>{item}
              </li>
            )
          }
        </ul>
      </CardContent>
    </Card>    
  )
}

export function HowItWorks() {
  return (
    // <div className="bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-25% to-blue-dark to-90% text-white-800 pt-8">
    <div className="bg-blue text-off-white pt-8">
      <div className="max-w-7xl w-11/12 m-auto pb-12 px-8">
        <main className="" data-cy="landingOtherServicesSection">
          <header>
            <h2 className="text-2xl text-center mb-12">How It Works</h2>
          </header>

          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-y-12 md:gap-x-6 xl:gap-12 grid-rows-3 md:grid-rows-2 xl:grid-rows-1">

              <HowItWorksCard item={'SelectTutor'}/>

              <HowItWorksCard item={'BookLesson'}/>

              <HowItWorksCard item={'Feedback'}/>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
