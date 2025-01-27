import {useState} from "react";
import {useAuth} from "@/context/AuthContext"


const login =()=>{
    const {login} = useAuth();
    const [email,setEmail]= useState("");
    const[password,setPassword] =useState("");
    const[error,setError] = useState("");
    const[loading,setLoading]= useState(false);
     
    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        try{
         await login({email, password});
        }catch(err: any){
            setError(err.response?.data?.error|| "something went wrong")
        }finally{
            setLoading(false);
        }
    }

return(
    <div>
        <h1>Login</h1>
        <form onSubmit = {handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
         <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
<button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
    </div>
)


}


export default login;
