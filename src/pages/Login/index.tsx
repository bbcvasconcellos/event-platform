import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/Header/logo"

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: {name: $name, email: $email}) {
      id
    }
  }
`


export const Login = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { data, error, loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION);

  const handleSubmit = async(event: FormEvent) => {
    event.preventDefault();
    createSubscriber({
      variables: {
        name,
        email
      }
    })
    await navigate('/event');
  }

  return(
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Icon />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Build your own <strong className="text-blue-500">React</strong> application from <strong className="text-blue-500">zero to hero</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            In just a few weeks you will be able to learn and develop your own web pages using ReactJS!
          </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Subscribe for free</strong>
          <form 
            className="flex flex-col gap-2 w-full"
            onSubmit={handleSubmit}
          >
            <input 
              type="text"
              placeholder="Your full name" 
              className="bg-gray-900 rounded px-5 h-14" 
              onChange={event => setName(event.target.value)}
            />
            <input 
              type="email"
              placeholder="email"
              className="bg-gray-900 rounded px-5 h-14" 
              onChange={event => setEmail(event.target.value)}
            />
            <button
              type="submit"
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:brightness-75 duration-300 disabled:opacity-50"
              disabled={loading}
            >
              Reserve my spot
            </button>
          </form>
        </div>
      </div>
      <img src="/src/assets/code_mockup.png" alt="code mockup" className="mt-10"/>

    </div>
  )
}