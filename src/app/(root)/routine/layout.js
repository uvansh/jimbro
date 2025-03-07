import {Toaster} from '@/components/ui/toaster';

const RoutineLayout = ({children}) => {
    return(
        <div>
            <Toaster/>
            {children}
        </div>
    )
}

export default RoutineLayout;