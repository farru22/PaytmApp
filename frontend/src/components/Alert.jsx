import {Link} from 'react-router-dom' 
export function Alert({
  text,to,buttonText
})
{
    return <div className="flex justify-center p-2 ">
        <div>{text}</div>
        <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
}