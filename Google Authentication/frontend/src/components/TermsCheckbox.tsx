export default function TermsCheckbox({
	checked,
	handleChange,
}: {
	checked: boolean;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<label className="flex gap-[4px] items-center text-[14px] text-light-gray">
			<input id="checkbox" type="checkbox" checked={checked} onChange={(e) => handleChange(e)} />I
			agree to the Terms of Services & Privacy Notice
		</label>
	);
}
