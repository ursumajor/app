import RequireAuth from '../components/RequireAuth';

const ProfilePage = () => {
    return <RequireAuth> <div> My Protected Component </div></RequireAuth> 
}

export default ProfilePage;