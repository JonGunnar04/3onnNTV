import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle } from "./ui/card";
import {
  Field,
  FieldGroup,
  FieldSet,
} from "./ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./Button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import useDebounce from "./hooks/useDebounce";

type FormValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  selectedFruit: string;
  radioButton: string | null;
};

export function Form() {
  const dataRef = useRef<FormValuesType>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    selectedFruit: "",
    radioButton: null,
  });

  const [values, setValues] = useState<FormValuesType>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    selectedFruit: "",
    radioButton: null,
  });

  const [entryEmail, setEntryEmail] = useState("");
  const [showForm, setShowForm] = useState(false);

  const onInputChange = useCallback((key: keyof FormValuesType, value: string) => {
    const updatedValues = {
      ...dataRef.current,
      [key]: value,
    };

    dataRef.current = updatedValues;
    setValues(updatedValues);
  }, []);

  const onSubmit = () => {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      selectedFruit,
      radioButton,
    } = dataRef.current;

    window.alert(
      `First name: ${firstName}
Last name: ${lastName}
Email: ${email}
Mobile number: ${mobileNumber}
Selected fruit: ${selectedFruit}
Radio button: ${radioButton}`
    );
  };

  const onCreateNew = useCallback(() => {
    const trimmedEmail = entryEmail.trim();

    if (!trimmedEmail) {
      window.alert("Email is required");
      return;
    }

    const newValues: FormValuesType = {
      firstName: "",
      lastName: "",
      email: trimmedEmail,
      mobileNumber: "",
      selectedFruit: "",
      radioButton: null,
    };

    dataRef.current = newValues;
    setValues(newValues);
    setShowForm(true);
  }, [entryEmail]);

  const onLoad = useCallback(() => {
    const trimmedEmail = entryEmail.trim();

    if (!trimmedEmail) {
      window.alert("Email is required");
      return;
    }

    const localStorageValue = localStorage.getItem(trimmedEmail);

    if (!localStorageValue) {
      window.alert("Email not found");
      return;
    }

    const parsedLocalStorageValue: FormValuesType = JSON.parse(localStorageValue);

    dataRef.current = parsedLocalStorageValue;
    setValues(parsedLocalStorageValue);
    setShowForm(true);
  }, [entryEmail]);

  const debouncedFormValues = useDebounce(JSON.stringify(values), 1000);

  useEffect(() => {
    if (!showForm) return;
    if (!values.email) return;

    localStorage.setItem(values.email, debouncedFormValues);
  }, [debouncedFormValues, showForm, values.email]);

  if (!showForm) {
    return (
      <div>
        <Card className="w-full max-w-3xl bg-blue-950 mt-4 border-white/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="grow border h-0"></div>
              <CardTitle className="text-white text-2xl font-light">
                Already filled out form?
              </CardTitle>
              <div className="grow border h-0"></div>
            </div>
          </CardHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="w-full"
          >
            <FieldSet>
              <FieldGroup>
                <Field>
                  <Input
                    className="bg-white h-14 text-lg"
                    id="entryEmail"
                    autoComplete="off"
                    type="email"
                    placeholder="example@email.com"
                    value={entryEmail}
                    onChange={(e) => setEntryEmail(e.target.value)}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <div className="flex flex-col py-4 gap-4">
              <Button
                value="load"
                type="button"
                onClick={onLoad}
                className="bg-green-500 p-4 rounded text-white uppercase"
              />
              <Button
                value="create new"
                type="button"
                onClick={onCreateNew}
                className="bg-green-500 p-4 rounded text-white uppercase"
              />
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Card className="w-full max-w-3xl bg-blue-950 mt-4 border-white/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="grow border h-0"></div>
            <CardTitle className="text-white text-2xl font-light">
              Example
            </CardTitle>
            <div className="grow border h-0"></div>
          </div>
        </CardHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="w-full"
        >
          <FieldSet>
            <FieldGroup>
              <Field>
                <Input
                  className="bg-white h-14 text-lg"
                  id="firstName"
                  autoComplete="off"
                  placeholder="First name"
                  value={values.firstName}
                  onChange={(e) => {
                    onInputChange("firstName", e.target.value);
                  }}
                />
              </Field>

              <Field>
                <Input
                  className="bg-white h-14 text-lg"
                  id="lastName"
                  autoComplete="off"
                  placeholder="Last name"
                  value={values.lastName}
                  onChange={(e) => {
                    onInputChange("lastName", e.target.value);
                  }}
                />
              </Field>

              <Field>
                <Input
                  className="bg-white h-14 text-lg"
                  id="email"
                  disabled
                  autoComplete="off"
                  type="email"
                  placeholder="example@email.com"
                  value={values.email}
                  onChange={(e) => {
                    onInputChange("email", e.target.value);
                  }}
                />
              </Field>

              <Field>
                <Input
                  className="bg-white h-14 text-lg"
                  id="mobileNumber"
                  autoComplete="off"
                  type="tel"
                  placeholder="Mobile number"
                  value={values.mobileNumber}
                  onChange={(e) => {
                    onInputChange("mobileNumber", e.target.value);
                  }}
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Select
                value={values.selectedFruit}
                onValueChange={(value) => {
                  onInputChange("selectedFruit", value);
                }}
              >
                <SelectTrigger className="w-full bg-white h-14 text-lg">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FieldGroup>

            <FieldGroup>
              <RadioGroup
                value={values.radioButton ?? ""}
                className="w-fit flex items-center gap-3"
                onValueChange={(value) => {
                  onInputChange("radioButton", value);
                }}
              >
                <RadioGroupItem className="bg-white" value="yes" id="yes" />
                <Label className="text-white" htmlFor="yes">
                  Yes
                </Label>

                <RadioGroupItem className="bg-white" value="no" id="no" />
                <Label className="text-white" htmlFor="no">
                  No
                </Label>
              </RadioGroup>
            </FieldGroup>
          </FieldSet>

          <div className="flex flex-col py-4 gap-4">
            <Button
              type="submit"
              className="bg-pink-500 p-4 rounded text-white uppercase tracking-[0.3em]"
            />
            <div className="flex items-center gap-2">
              <div className="grow border h-0"></div>
              <CardTitle className="text-white font-light">or</CardTitle>
              <div className="grow border h-0"></div>
            </div>
            <Button
              value="edit"
              type="button"
              className="bg-black p-4 rounded text-white uppercase border-pink-500 border tracking-[0.3em]"
            />
          </div>
        </form>
      </Card>
    </div>
  );
}