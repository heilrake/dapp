import { Hero } from "@components/ui/common";
import { CourseList, CourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { useWeb3 } from "@components/providers";
export default function Home({ courses }) {
  const { web3, isLoading } = useWeb3()

  return (
    <>
      {isLoading ? "Is Loading Web3..." : web3 ? "Web 3 Ready!" : "Please install metamask"}
      <Hero />
      <CourseList courses={courses}  >
        {course =>
          <CourseCard
            key={course.id}
            course={course}
          />
        }
      </CourseList>
    </>
  )
}

export function getStaticProps() {
  const { data } = getAllCourses()
  return {
    props: {
      courses: data
    }
  }
}

Home.Layout = BaseLayout
