export default function FormatDate(val) {
    const date = new Date(val);
    const renderDate = date.toLocaleDateString('fr-CA');
    return renderDate;
}