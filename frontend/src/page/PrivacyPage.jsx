import React from "react";

function PrivacyPage() {
  return (
    <div
      className="flex w-full   justify-center items-center  pl-5 mt-5 "
      style={{
        background:
          "linear-gradient(to bottom right,#09090b 5% ,#171717 60%,#172554)",
      }}
    >
      <div className="w-[85%]   space-y-4">
        <h2 className="text-4xl font-bold">Privacy Policy</h2>
        <h3 className=" text-2xl font-bold">Introduction</h3>
        <p className="text-[17px] text-justify">
          Welcome to ProCoder's Privacy Policy.This policy explains how we
          collect, use, and protect your personal information when you use our
          services. We are committed to protecting your privacy and ensuring the
          compliance with the General Data Protection Regulation (GDPR) and
          other relevant data protection laws.
        </p>
        <h3 className="text-2xl font-bold">Information We Collect</h3>
        <p className="text-[17px] text-justify">
          We collect various types of information, inluding:- Personal
          Information: This includes your name, emial address, username, and any
          other information you provide during registration or while using our
          services. Usage Data: We collect data about your interactions with our
          platform, such as the problems you solve, the solutions you submit,
          and the time you spend on the platform. Technical Data: We collect
          technical information about your device, including your IP address,
          browser type, and operating system.
        </p>
        <h3 className=" text-2xl font-bold">How We Use Your Information</h3>
        <p className="text-[17px] text-justify">
          We use your information for the following purposes: To Provide and
          Improve Our Services: We use your data to deliver our services,
          personalize your experience, and improve the functionality of our
          platform. To Communicate with You: We may send you emails or
          notifications about updates, new features, or important information
          related to your account. For Analytics and Research: We analyze user
          data to understand how our platform is used and to identify areas for
          improvement. For Legal and Security Purposes: We may use your
          information to comply with legal obligations and protect the security
          of our platform and users.
        </p>
        <h3 className=" text-2xl font-bold">
          Information Sharing and Disclosure
        </h3>
        <p className="text-[17px] text-justify">
          We may share your information with: Service Providers: We engage
          third-party service providers to assist with various functions, such
          as hosting, analytics, and customer support. These providers are
          contractually obligated to protect your information. Legal
          Authorities: We may disclose your information if required by law or in
          response to valid legal requests. Business Transfers: In the event of
          a merger, acquisition, or sale of assets, your information may be
          transferred to the acquiring entity.
        </p>
        <h3 className=" text-2xl font-bold">Data Security</h3>
        <p className="text-[17px] text-justify">
          We implement appropriate technical and organizational measures to
          protect your personal information from unauthorized access, use, or
          disclosure. These measures include encryption, access controls, and
          regular security assessments.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPage;
