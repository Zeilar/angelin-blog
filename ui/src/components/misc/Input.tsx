import { FocusEventHandler, RefObject } from "react";
import styled from "styled-components";
import * as Styles from "../styled-components";
import classnames from "classnames";
import { color } from "../../styles/theme";
import { useState } from "react";

interface Props {
	label?: string;
	errors?: string[];
	value: string;
	containerClass?: string;
	forwardRef?: RefObject<HTMLInputElement>;
	[key: string]: any;
}

export function Input(props: Props) {
	const [stayFocused, setStayFocused] = useState(false);
	const hasErrors = props.errors && props.errors.length > 0;

	function blurHandler(e: any) {
		setStayFocused(e.target.value.length > 0);
	}

	return (
		<Styles.Col
			className={classnames(props.containerClass, "mt-5 relative")}
			align="flex-start"
		>
			{hasErrors && (
				<Errors>
					{props.errors?.map((error: string, i: number) => (
						<Styles.FormError key={i}>{error}</Styles.FormError>
					))}
				</Errors>
			)}
			<InputField
				className={classnames({
					error: hasErrors,
					label: Boolean(props.label),
					active: stayFocused,
				})}
				onBlur={blurHandler}
				ref={props.forwardRef}
				{...props}
			/>
			{props.label && <Label className="mb-2">{props.label}</Label>}
		</Styles.Col>
	);
}

const InputField = styled(Styles.Input)`
	width: 100%;
	border-color: rgb(${color.pick("textMuted").get()});
	&::placeholder {
		color: transparent;
	}
	&:focus,
	&.active {
		border-color: hsl(${color.pick("brand").get()});
		& ~ label {
			transform: translateY(-2rem);
			color: hsl(${color.pick("brand").get()});
			font-size: 0.85rem;
		}
	}
`;

const Label = styled.label`
	position: absolute;
	left: 0;
	bottom: 0;
	cursor: text;
	transition: 0.25s;
	pointer-events: none;
	color: rgb(${color.pick("textMuted").get()});
`;

const Errors = styled(Styles.Grid)`
	justify-items: flex-start;
	margin-bottom: 1rem;
	grid-gap: 0.25rem;
`;
