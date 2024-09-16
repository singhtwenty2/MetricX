import React from "react";
import { CheckCircle2 } from "lucide-react";
import assets from "../../assets/assets";
import { checklistItems } from "../../constants";
import { div } from "framer-motion/client";
import { fadeIn } from "../../constants/Variants";
import { motion, stagger } from "framer-motion";

const WorkFlow = () => {
  return (
    <div className="mt-10 " id="Workflow">
      <h2 className="text-xl sm:text-3xl lg:text-4xl text-center mt-6 tracking-wide font-bold">
        Accelerate Performance with
        <span className=" bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text ">
          {" "}
          Our Workflow
        </span>
      </h2>
      <div className="flex flex-wrap justify-center text-center ">
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className=" flex pl-10 pt-12  p-2 w-full lg:w-1/2 justify-center"
        >
          <img src={assets.Code} alt="code" />
        </motion.div>
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="pt-12 w-full lg:w-1/3 "
        >
          {checklistItems.map((item, index) => (
            <div key={index} className="flex mb-12 ">
              <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className=" flex mt-1 mb-2 text-xl"> {item.title}</h5>
                <p className="text-left text-neutral-500 ">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WorkFlow;
