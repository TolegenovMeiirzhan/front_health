export default function Switch({firstValueName, secondValueName, isFirstValueChecked, toggleValue}) {
    return (
        <div onClick={toggleValue}
            className='group p-1 w-full flex bg-neutral-200 border border-neutral-300 rounded-full cursor-pointer'>
            <div className={`w-1/2 p-3 text-center rounded-full 
            ${isFirstValueChecked && 'bg-switch-checked group-hover:bg-switch-checked-hover text-white'}`}>
                {firstValueName}
            </div>
            <div className={`w-1/2 p-3 text-center rounded-full 
            ${!isFirstValueChecked && 'bg-switch-checked group-hover:bg-switch-checked-hover text-white'}`}>
                {secondValueName}
            </div>
        </div>
    );
}