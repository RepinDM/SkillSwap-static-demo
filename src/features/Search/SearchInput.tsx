import { Input } from "@/shared/ui/input";
import { setSearchQuery } from "@/services/slices/skillCardsSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/services/hooks";
import { useEffect, useRef, useState } from "react";

const DELAY = 300;

type SearchInputProps = {
  placeholder?: string;
  className?: string;
  value?: string;
};

export const SearchInput = ({
  value = "",
  ...props
}: SearchInputProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (location.pathname !== "/") {
      dispatch(setSearchQuery(""));
      setLocalValue("");
    }
  }, [location.pathname, dispatch]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setLocalValue(val);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(setSearchQuery(val));

      if (location.pathname !== "/") {
        navigate("/");
      }
    }, DELAY);
  };

  return (
    <Input
      {...props}
      value={localValue}
      type="search"
      onChange={handleChange}
    />
  );
};