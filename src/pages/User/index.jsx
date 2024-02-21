import { useParams } from "react-router-dom";
import { useEffect } from "react";

const UserPage = () => {

    const { id } = useParams();

    useEffect(() => {
        
    }, []);

    return (
        <div className="w-screen h-screen">
            <p>
                {id}
            </p>
        </div>
    );
}

export default UserPage;