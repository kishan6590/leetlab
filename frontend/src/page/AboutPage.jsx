import React from "react";

function AboutPage() {
  return (
    <div className="w-full h-screen  flex flex-col items-center  pl-5 mt-5"
    style={{background:"linear-gradient(to bottom right,#09090b 5% ,#171717 60%,#172554)"}}>
      <div className="  w-[85%] space-y-4" >
        <h2 className=" text-3xl font-bold"> About ProCoder</h2>
        <p className="text-lg">
          ProCoder is a platform dedicated to helping developers enhance their
          coding skills through practice and collaboration. Our mission is to
          provide a comprehensive and engaging environment for learning and
          mastering algorithms and data structures.
        </p>
        <h3 className="text-2xl font-bold">Our Mission</h3>
        <p>
          To empower developers of all levels to achieve their coding goals by
          offering a vast library of coding problems, real-time coding
          environments, and a supportive community.
        </p>

        <h3 className="font-bold text-2xl">The Team</h3>

        <p>
          ProCoder is built by a team of passionate engineers and educators
          committed to providing the best coding practice experience. Our team
          includes softwares engineers, algorithm experts, and community
          managers who work tirelessly to improve the platform and support our
          users.
        </p>
        <h3 className="text-2xl font-bold">Contact Us</h3>

        <p>
          For any inquires, feedback, or support, please react out to us at
          support@procoder.com we are always happy to hear from our users and
          improve our platform bases on your suggestions.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
