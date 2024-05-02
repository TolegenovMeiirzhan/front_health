export default function Button({text, onClick, isFullWidth=false, isDisabled=false})
{
    return (
        <button onClick={onClick} disabled={isDisabled} type='button'
            className={`px-16 py-4 my-4 font-semibold text-white rounded-full bg-button-primary hover:bg-button-primary-hover disabled:bg-button-disabled
            ${isFullWidth && 'w-full'}`}>
            {text}
        </button>
    );
}