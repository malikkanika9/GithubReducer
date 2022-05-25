import { useEffect, useReducer } from "react"
import axios from "axios"
const init={
loading:true,
error: false,
data:null
}
const Gitaction={
    "fetch":"fecth",
     "success": "success",
     "failure":"failure"
}
const GithubReducer=(state,action)=>{
    switch(action.type)
    {
       case Gitaction.fetch: {
            return(
                {
                    ...state,
                    loading: true,
                    error:false,
                    data:null
                })}
        case Gitaction.success:{
            return(
                {
                    ...state,
                    loading: false,
                    error:false,
                    data:action.payload
                }) }
        case Gitaction.failure:{
            return(
                {
                    ...state,
                    loading:false,
                    error: true
                }
            )
        }
        default :
     return state
    }
}
function Github(){
    const[{ loading,error,data,},dispatch]=useReducer(GithubReducer,init)
useEffect(()=>{
    dispatch({
        type:Gitaction.fetch
    })
  axios({
        url: "https:api.github.com/search/users",
        method:"GET",
        params:{
q:"masai",

        }
    }).then(res=>{
        dispatch({
            type:Gitaction.success,
            payload:res.data
        })
    })
    .catch(err=>{
        dispatch({
        type:Gitaction.failure
        })
    })
},[])
console.log(data)
    return(
<div>
{loading && <div>...loading </div>}
{error && <div>Error</div>}
{data?.items.map(item=>
<div key={item.id} style={{display:"flex"}}>
<div>{item.avatar_url}</div>
 <br />   <div >{item.login}</div>
    
    </div>
    )}
</div>
    )
}
export default Github