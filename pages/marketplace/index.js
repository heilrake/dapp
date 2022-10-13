import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { useWalletInfo } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { useState } from "react";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";

export default function Marketplace({ courses }) {
  const { web3 } = useWeb3();
  const { canPurchaseCourse, account } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState(null);

  // haxing data by orderForm 
  const purchaseCourse = order => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);
    console.log(hexCourseId);

    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    );
    console.log(orderHash);
    const emailHash = web3.utils.sha3(order.email);

    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: orderHash }
    );
  }

  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>
      <CourseList
        courses={courses}
      >
        {course =>
          <CourseCard
            key={course.id}
            course={course}
            disabled={!canPurchaseCourse}
            Footer={() =>
              <div className="mt-4">
                <Button
                  onClick={() => setSelectedCourse(course)}
                  disabled={!canPurchaseCourse}
                  variant="lightPurple">
                  Purchase
                </Button>
              </div>
            }
          />
        }
      </CourseList>
      {selectedCourse &&
        <OrderModal
          onSubmit={purchaseCourse}
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
