export default function PhaseTitle({children}: { children: React.ReactNode }) {
    return (
        <div className={'w-full text-center'}>
            <span>
            {children}
            </span>
        </div>
    )
}