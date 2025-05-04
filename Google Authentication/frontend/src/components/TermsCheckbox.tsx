export default function TermsCheckbox({
	checked,
	setChecked,
}: {
	checked: boolean;
	setChecked: (value: boolean) => void;
}) {
	return (
		<label className="flex gap-[4px] items-center text-[14px] text-light-gray">
			<input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />I
			agree to the Terms of Services & Privacy Notice
		</label>
	);
}
