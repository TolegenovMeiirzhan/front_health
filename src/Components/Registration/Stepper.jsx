export default function Stepper({numberOfSteps, currentStepIndex}) {
    return (
        <div className="mb-8 flex gap-2 w-full justify-evenly">
            {[...Array(numberOfSteps)].map((x, i) =>
                <span key={i}
                    className={`h-1 rounded-full 
                w-1/${numberOfSteps} ${i+1 <= currentStepIndex ? 'bg-button-primary border border-button-primary' : 'bg-neutral-200 border-neutral-400 border'}`}></span>
            )}
        </div>
    );
}