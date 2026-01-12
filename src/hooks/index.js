"use client";
import { useEffect, useRef, useCallback, useState } from "react";

/**
 * Hook to detect clicks outside of a referenced element
 * @param {Function} callback - Function to call when click outside is detected
 * @returns {React.RefObject} - Ref to attach to the target element
 */
export function useClickOutside(callback) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
}

/**
 * Hook to manage a toggle state with click-outside functionality
 * @returns {Object} - { isOpen, setIsOpen, toggle, close, ref }
 */
export function useToggleMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const ref = useClickOutside(close);

  return { isOpen, setIsOpen, toggle, close, ref };
}

/**
 * Hook for countdown timer (useful for OTP resend)
 * @param {number} initialTime - Initial time in seconds
 * @returns {Object} - { timeLeft, isComplete, reset, restart }
 */
export function useCountdown(initialTime) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isComplete, setIsComplete] = useState(initialTime <= 0);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsComplete(true);
      return;
    }

    setIsComplete(false);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const reset = useCallback(() => {
    setTimeLeft(initialTime);
    setIsComplete(initialTime <= 0);
  }, [initialTime]);

  // Restart with a new time value
  const restart = useCallback((newTime) => {
    setTimeLeft(newTime);
    setIsComplete(newTime <= 0);
  }, []);

  return { timeLeft, isComplete, reset, restart };
}

/**
 * Hook for form state management
 * @param {Object} initialState - Initial form values
 * @returns {Object} - { formData, handleChange, setFormData, resetForm }
 */
export function useFormState(initialState) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  return { formData, handleChange, setFormData, resetForm };
}

/**
 * Hook for handling async operations with loading and error states
 * @returns {Object} - { isLoading, error, execute }
 */
export function useAsync() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (asyncFunction) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await asyncFunction();
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, execute };
}

/**
 * Hook for keyboard event handling
 * @param {Object} keyMap - Object mapping key names to handler functions
 * @param {boolean} enabled - Whether to listen for events
 */
export function useKeyboardShortcuts(keyMap, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      const handler = keyMap[event.key];
      if (handler) {
        handler(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyMap, enabled]);
}

/**
 * Hook to persist state in localStorage
 * @param {string} key - localStorage key
 * @param {any} initialValue - Initial value if no stored value exists
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
