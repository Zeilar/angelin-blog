import { useState, useEffect } from "react";
import styled from "styled-components";

enum Status {
	Loading = "loading",
	Success = "success",
	Error = "error",
}

export default function useFetch() {
	const [data, setData] = useState<any>();
	const [status, setStatus] = useState<Status>(Status.Loading);

	return null;
}
