import SignUpForm from '@/components/Authentication/SignUpForm';
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

export default function SignUp() {
  return (
    <>
      <SignUpForm />
    </>
  );
}
