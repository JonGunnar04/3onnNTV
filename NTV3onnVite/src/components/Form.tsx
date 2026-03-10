import { useCallback, useRef, useState } from "react";
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
    firstName: string
    lastName: string
    email: string
    mobileNumber: string
    selectedFruit: string
    radioButton: string | null
}

export function Form() {
    // TODO: Remove ref data set, and only use state to keep track of realtime local data (written in input)
    // NOTE: You might want to detach the email from the data set (since it's used to index the localstorage)
    const dataRef = useRef<FormValuesType>({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        selectedFruit: '',
        radioButton: null,
    })

    const [values, setValues] = useState<FormValuesType>({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        selectedFruit: '',
        radioButton: null,
    })

    const onInputChange = useCallback((key: keyof FormValuesType, value: string) => {
        dataRef.current[key] = value
        setValues((prev) => ({
            ...prev,
            [key]: value,
        }))
    }, [])

    const onSubmit = () => {
        const {
            firstName,
            lastName,
            email,
            mobileNumber,
            selectedFruit,
            radioButton,
        } = dataRef.current

        window.alert(
            `First name: ${firstName}
Last name: ${lastName}
Email: ${email}
Mobile number: ${mobileNumber}
Selected fruit: ${selectedFruit}
Radio button: ${radioButton}`
        )
    }

    const loadEmailRef = useRef<HTMLInputElement>(null)

    const onLoad = useCallback(() => {
        if (loadEmailRef.current && loadEmailRef.current.value) {
            const localStorageValue = localStorage.getItem(loadEmailRef.current?.value)
            if (localStorageValue) {
                const parsedLocalStorageValue: FormValuesType = JSON.parse(localStorageValue)
                window.alert(parsedLocalStorageValue.firstName)
                loadEmailRef.current.value = ''
                setValues(parsedLocalStorageValue)
                dataRef.current = parsedLocalStorageValue
            } else {
                window.alert('Email not found')
            }
        } else {
            window.alert('Some bug was found!')
        }
    }, [])

    // TODO: Use the correct state to connect to debounce state
    const [TEMP_HOOK_REPLACE] = useState(values.firstName);

    // Set delay time according to your needs
    const debouncedSearchTerm = useDebounce(TEMP_HOOK_REPLACE, 1000);
    // TODO: Write useEffect to repopulate the localstorage after debounce
    // NOTE: The email has to be present for this to work

    // TODO: If no email is provided, display only the email input, or some other alternative UX

    return (
        <div>
            {/* {(firstName || lastName) ? <p>Your name is: {headerValue} </p> : <p>What is your name?</p>} */}
            <Card className="w-full max-w-3xl bg-blue-950 mt-4 border-white/20">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="grow border h-0"></div>
                        <CardTitle className="text-white text-2xl font-light">Example</CardTitle>
                        <div className="grow border h-0"></div>
                    </div>
                </CardHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        onSubmit()
                    }}
                    className="w-full"
                >
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <p className="text-white">Search term: {debouncedSearchTerm}</p>
                                <Input
                                    className="bg-white h-14 text-lg"
                                    id="firstName"
                                    autoComplete="off"
                                    placeholder="First name"
                                    // TODO: Set values to all input fields in the form
                                    value={values.firstName}
                                    onChange={(e) => {
                                        onInputChange('firstName', e.target.value)
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
                                        onInputChange('lastName', e.target.value)
                                    }}
                                />
                            </Field>
                            <Field>
                                <Input
                                    className="bg-white h-14 text-lg"
                                    id="email"
                                    autoComplete="off"
                                    type="email"
                                    placeholder="example@email.com"
                                    value={values.email}
                                    onChange={(e) => {
                                        onInputChange('email', e.target.value)
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
                                        onInputChange('mobileNumber', e.target.value)
                                    }}
                                />
                            </Field>
                        </FieldGroup>
                        <FieldGroup>
                            <Select
                                value={values.selectedFruit}
                                onValueChange={(e) => {
                                    onInputChange('selectedFruit', e)
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
                                onValueChange={(e) => {
                                    onInputChange('radioButton', e)
                                }}
                            >
                                <RadioGroupItem className="bg-white" value="yes" id="yes" />
                                <Label className="text-white" htmlFor="yes">Yes</Label>
                                <RadioGroupItem className="bg-white" value="no" id="no" />
                                <Label className="text-white" htmlFor="no">No</Label>
                            </RadioGroup>
                        </FieldGroup>
                    </FieldSet>
                    <div className="flex flex-col py-4 gap-4">
                        <Button type="submit" className="bg-pink-500 p-4 rounded text-white uppercase tracking-[0.3em]" />
                        <div className="flex items-center gap-2">
                            <div className="grow border h-0"></div>
                            <CardTitle className="text-white font-light">or</CardTitle>
                            <div className="grow border h-0"></div>
                        </div>
                        <Button value="edit" type="button" className="bg-black p-4 rounded text-white uppercase border-pink-500 border tracking-[0.3em]" />
                    </div>
                </form>
            </Card>
            <Card className="my-4">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="grow border h-0"></div>
                        <CardTitle>Already filled out form?</CardTitle>
                        <div className="grow border h-0"></div>
                    </div>
                </CardHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        onLoad()
                    }}
                    className="w-full"
                >
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <Input
                                    className="bg-white"
                                    id="email"
                                    autoComplete="off"
                                    type="email"
                                    ref={loadEmailRef}
                                    placeholder="asdf@ntv.is"
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <div className="flex flex-col py-4 gap-4">
                        <Button value="load" type="submit" className="bg-green-500 p-4 rounded text-white uppercase" />
                        <Button value="create new" type="submit" className="bg-green-500 p-4 rounded text-white uppercase" />
                    </div>
                </form>
            </Card>
        </div>
    );
}