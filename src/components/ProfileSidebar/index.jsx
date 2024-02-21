import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock, faList, faHeart, faCircleDollarToSlot, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

import avatar from '../../assets/avatar.png';


const _Foo = (props) => {
    var style = `w-full flex items-center block p-4 ${props.checked ? 'bg-slate-300' : ''}`;
    return (
        <label className={style + " hover:bg-slate-300 transition-colors cursor-pointer tracking-wider"}>
            <FontAwesomeIcon className="mr-4" icon={props.icon} />
            {props.title}
        </label>
    );
}


const ProfileSidebar = () => {



    return (
        <aside className="flex flex-col justify-between bg-slate-200 w-2/12">
            <div>
                <Link to="/profile"> <_Foo title="My Information" icon={faUser} checked /></Link>
                <Link to="/profile/history" ><_Foo title="My History" icon={faClock} /></Link>
                <Link to="/profile/orders"><_Foo title="My Ads" icon={faList} /></Link>
                <Link to="/profile/favourites"><_Foo title="My Favourite" icon={faHeart} /></Link>
            </div>

            <div className="flex items-center justify-between bg-slate-300 w-full p-2 pr-5">
                <img src={avatar} alt="" width="64" />
                <FontAwesomeIcon className="text-blue-950 w-5 h-5" icon={faRightFromBracket} />
            </div>
        </aside>
    );
}

export default ProfileSidebar;