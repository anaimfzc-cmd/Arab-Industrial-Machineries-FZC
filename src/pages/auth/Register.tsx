import { SignUp } from "@clerk/clerk-react";
import { Layout } from "@/components/layout/Layout";

const Register = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[80vh]">
        <SignUp />
      </div>
    </Layout>
  );
};

export default Register;