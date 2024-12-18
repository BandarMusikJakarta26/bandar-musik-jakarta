export default function RegisterForm({ children, handleSubmit, onFormSubmit }: any){
    return (
        <form method="post" onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-y-6">
            {children}
        </form>
    )
}