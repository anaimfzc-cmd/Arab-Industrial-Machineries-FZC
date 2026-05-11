import { SignIn } from "@clerk/clerk-react";
import { Layout } from "@/components/layout/Layout";

const Login = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[80vh]">
        <SignIn routing="path" path="/login" />
      </div>
    </Layout>
  );
};

export default Login;