import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";

export default function Routes() {

    const index = useRoutes([
        {
            path:'/',
            element:<Home/>
        }

    ])
    return index
}

