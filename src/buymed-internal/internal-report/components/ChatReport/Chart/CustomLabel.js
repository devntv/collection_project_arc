const CustomLabel = (props) => {
    const { x, y, payload } = props;
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={10} textAnchor="end" fill="#666" transform="rotate(-10)">
                {payload.value}
            </text>
        </g>
    );
}

export default CustomLabel;