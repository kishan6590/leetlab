import React from "react";

function TermsPage() {
  return (
    <div
      className="flex  justify-center "
      style={{
        background:
          "linear-gradient(to bottom right,#09090b 5% ,#171717 60%,#172554)",
      }}
    >
      
      <div className="w-[85%]  space-y-4">
        <h2 className="text-4xl font-bold mb-8 mt-5">Terms of Service</h2>
        <h3 className="text-2xl font-bold">1. Acceptance of Terms </h3>
        <p className="text-lg">
          By accessing or using ProCoder (the "Service"), you agree to be bound
          by these Terms of Service ("Terms"). If you do not agree to these
          Terms, you may not use the Service.
        </p>
        <h3 className="text-2xl font-bold">2. User Responsibilities </h3>

        <p className="text-lg">
          You are responsible for maintaining the confidentially of your account
          and password. You agree to notify us immediately of any unauthorized
          use of your account. You are responsible for all activites that occurs
          under your account.
        </p>
        <h3 className="text-2xl font-bold">3. Acceptable Use Policy</h3>
        <p className="text-lg">
          You agree not to use the Service unlawful purpose or in any way that
          could harm, disable, overburden, or impair the Service. You agree not
          to interface with any other party's use and enjoyment of the Service.
        </p>
        <h3 className="text-2xl font-bold">4. Intellectual Property Rights</h3>

        <p className="text-lg">
          All content and material available on the Service, including but not
          limited to code, text, graphics, logos, and software, are the property
          of CodeMaster or its licensors and are protected by copyright,
          trademark, and other intellectual property laws.
        </p>
        <h3 className="text-2xl font-bold">5. Disclaimers</h3>

        <p className="text-lg">
          The Service is provided on an "as is" and "as available" without any
          warranties of any kind, either express or implied. We do not warrent
          that the Service will be uninterrupted or error-free.
        </p>
        <h3 className="text-2xl font-bold">6. Limitations of Liability</h3>

        <p className="text-lg">
          In no event shall Procoder liable for any indirect, incidental,
          special, consequentail, or punitive damages, or any damages whatsoever
          arising out of or related to your use of the Service.
        </p>
        <h3 className="text-2xl font-bold">7. Modifications to Terms </h3>
        <p className="text-lg">
          We reserve the right to modify these Terms at any time. Your continued
          use of the Service after any such changes constitues your acceptance
          of the new Terms.
        </p>
      </div>
    </div>
  );
}

export default TermsPage;
