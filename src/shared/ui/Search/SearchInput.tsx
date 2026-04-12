import { Input } from "@/shared/ui/input";
import { setSearchQuery } from "@/services/slices/skillCardsSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/services/hooks";
import { useMemo, useEffect, useState } from "react";

const debounce = (fn: (value: string) => void, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (value: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(value);
    }, delay);
  };
};

const DELAY = 300;

type SearchInputProps = {
  placeholder?: string;
  className?: string;
  value?: string;
};

export const SearchInput = ({
  ...props
}: SearchInputProps) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      setValue("")
      dispatch(setSearchQuery(""));
    }
  }, [location.pathname, dispatch]);

  const debouncedDispatch = useMemo(() => {
    return debounce((value: string) => {
      dispatch(setSearchQuery(value));
      if (value === "") {
        navigate("/search");
      } else {
        navigate(`/search?q=${value}`);
      }
    }, DELAY);
  }, [dispatch, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value)
    debouncedDispatch(value);
  };

  return <Input {...props} value={value} type="search" onChange={handleChange}/>
}
