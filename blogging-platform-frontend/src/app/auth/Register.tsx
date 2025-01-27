import {useState} from "react"
import {z} from "zod"
import { useRouter } from "next/router"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { authService } from "@/services/authService";



const registerSchema = z.object({
    username:z.string().min(3,"Username must be atleast 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be atleast 6 characters")
})


type RegisterFormData = z.infer<typeof registerSchema>;


const Register=()=>{
    const [error ,setError] = useState<string | null>(null);
    const router = useRouter();
    const{register,handleSubmit,formState:{errors},} = useForm<RegisterFormData>({
        resolver:zodResolver(registerSchema),
    })
const onSubmit = async(data:RegisterFormData)=>{
    try{
        await authService.register(data);
        router.push("/auth/login");
    }catch (err: any) {
        setError(err.response?.data?.error || "Something went wrong");
      }
}

return (
    <div>
        <h1>Register</h1>
        <form onSubmit = {handleSubmit(onSubmit)}>
        return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
            </form>
    </div>
)
} 


export default Register;