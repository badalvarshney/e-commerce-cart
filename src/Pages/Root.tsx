// import MainNavigation from '../components/MainNavigation'
import { Outlet } from 'react-router-dom';
import MainNavigation from '../Component/MainNavigation/MainNavigation';
// import MainNavigation from '../components/MainNavigation.tsx';

const RootLayout = () => {
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;