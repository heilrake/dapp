import { CourseList, CourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { WalletBar, EthRates } from "@components/ui/web3";
import { useWalletInfo } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { useState } from "react";
import { useEthPrice } from "@components/hooks/web3/useEhtPrice";
export default function Marketplace({ courses }) {
  const { eth } = useEthPrice();
  const { account, network, canPurchaseCourse } = useWalletInfo();

  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <>
      <div className="py-4">
        <WalletBar
          address={account.data}
          network={{
            data: network.data,
            target: network.target,
            isSupported: network.isSupported,
            hasInitialResponse: network.hasInitialResponse
          }}
        />
        <EthRates
          eth={eth.data}
          ethPerItem={eth.perItem}
        />
      </div>
      <CourseList
        courses={courses}
      >
        {course =>
          <CourseCard
            key={course.id}
            disabled={!canPurchaseCourse}
            course={course}
            Footer={() =>
              <div className="mt-4">
                <Button variant="lightPurple" disabled={!canPurchaseCourse} onClick={() => setSelectedCourse(course)}>
                  Purchase
                </Button>
              </div>
            }
          />
        }
      </CourseList>
      {selectedCourse &&
        <OrderModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      }
    </>
  )
};

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data
    }
  }
};

Marketplace.Layout = BaseLayout;
