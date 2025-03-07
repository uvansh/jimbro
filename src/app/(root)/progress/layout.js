import {Toaster} from '@/components/ui/toaster';

const ProgressLayout = ({children}) => {
    return(
        <div>
            <Toaster/>
            {children}
        </div>
    )
}

export default ProgressLayout;