import { CourseList, CourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { WalletBar } from "@components/ui/web3";
import { useAccount } from "@components/hooks/web3/useAccount";
import { useNetwork } from "@components/hooks/web3/useNetwork";

export default function Marketplace({ courses }) {
  const { account } = useAccount();
  const { network } = useNetwork();
  return (
    <>
      <div className="py-4">
        <WalletBar
          network={{
            data: network.data,
            target: network.target,
            isSupported: network.isSupported,
            hasFinishedFirstFetch: network.hasFinishedFirstFetch
          }}
        />
        "Current" {`${network.data}`}
        "Target" {`${network.target}`}
        "Is Supported" {`${network.isSupported}`}
      </div>
      <CourseList
        courses={courses}
      >
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
  const { data } = getAllCourses();
  return {
    props: {
      courses: data
    }
  }
};

Marketplace.Layout = BaseLayout;
