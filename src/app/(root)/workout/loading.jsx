import ClipLoader from 'react-spinners/ClipLoader';

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
            <ClipLoader color="#4EFF02" />
        </div>
    )
}

export default Loading;