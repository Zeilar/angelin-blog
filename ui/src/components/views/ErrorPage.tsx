import * as Styles from "../sc";

interface Props {
	code: number;
}

export function ErrorPage({ code }: Props) {
	return (
		<Styles.Container className="mt-20" align="center">
			<Styles.H2>{code}</Styles.H2>
			<Styles.H2>It seems I may have screwed up</Styles.H2>
			<Styles.Row as={Styles.H5} align="center">
				<span>If the issue persists, please contact me at</span>
				<Styles.SecondaryButton as="a" className="ml-3" href="mailto:admin@angelin.dev">
					admin@angelin.dev
				</Styles.SecondaryButton>
			</Styles.Row>
		</Styles.Container>
	);
}
