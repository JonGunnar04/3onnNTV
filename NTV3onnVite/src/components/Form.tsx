import { useRef } from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  selection: string;
  answer: "yes" | "no" | "";
};

export function Form() {
  const dataRef = useRef<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    selection: "",
    answer: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(dataRef.current, null, 2));
  };

  return (
    <div className="min-h-screen w-full bg-[#081226] flex items-center justify-center px-6 py-10">
      <form onSubmit={onSubmit} className="w-full max-w-xl">
        {/* Title + lines */}
        <div className="flex items-center gap-6 mb-10">
          <div className="flex-1">
            <Separator className="bg-white/30" />
          </div>
          <h1 className="text-white text-5xl font-light tracking-wide">Example</h1>
          <div className="flex-1">
            <Separator className="bg-white/30" />
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-7">
          <div className="space-y-2">
            <Label className="sr-only" htmlFor="firstName">
              First name
            </Label>
            <Input
              id="firstName"
              placeholder="First name"
              className="h-16 rounded-xl bg-white text-black placeholder:text-black/45 text-2xl px-6"
              onChange={(e) => (dataRef.current.firstName = e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="sr-only" htmlFor="lastName">
              Last name
            </Label>
            <Input
              id="lastName"
              placeholder="Last name"
              className="h-16 rounded-xl bg-white text-black placeholder:text-black/45 text-2xl px-6"
              onChange={(e) => (dataRef.current.lastName = e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="h-16 rounded-xl bg-white text-black placeholder:text-black/45 text-2xl px-6"
              onChange={(e) => (dataRef.current.email = e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="sr-only" htmlFor="mobile">
              Mobile number
            </Label>
            <Input
              id="mobile"
              placeholder="Mobile number"
              className="h-16 rounded-xl bg-white text-black placeholder:text-black/45 text-2xl px-6"
              onChange={(e) => (dataRef.current.mobileNumber = e.target.value)}
            />
          </div>

          {/* Select */}
          <div className="space-y-2">
            <Label className="sr-only">Select</Label>
            <Select onValueChange={(v) => (dataRef.current.selection = v)}>
              <SelectTrigger className="h-16 rounded-xl bg-white text-black text-2xl px-6">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option-1">Option 1</SelectItem>
                <SelectItem value="option-2">Option 2</SelectItem>
                <SelectItem value="option-3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Radio */}
          <div className="pt-2">
            <RadioGroup
              className="flex items-center gap-16"
              onValueChange={(v) => (dataRef.current.answer = v as "yes" | "no")}
            >
              <div className="flex items-center gap-3">
                <Label className="text-white text-2xl font-light" htmlFor="yes">
                  Yes
                </Label>
                <RadioGroupItem
                  id="yes"
                  value="yes"
                  className="border-white text-white"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label className="text-white text-2xl font-light" htmlFor="no">
                  No
                </Label>
                <RadioGroupItem
                  id="no"
                  value="no"
                  className="border-white text-white"
                />
              </div>
            </RadioGroup>
          </div>

          {/* Submit */}
          <div className="pt-10">
            <Button
              type="submit"
              className="w-full h-20 rounded-xl bg-pink-500 hover:bg-pink-500/90 text-white text-2xl tracking-[0.35em] font-light uppercase"
            >
              Submit
            </Button>
          </div>

          {/* or separator */}
          <div className="flex items-center gap-6 py-6">
            <div className="flex-1">
              <Separator className="bg-white/30" />
            </div>
            <div className="text-white/90 text-2xl font-light">or</div>
            <div className="flex-1">
              <Separator className="bg-white/30" />
            </div>
          </div>

          {/* Edit */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-20 rounded-xl border-2 border-pink-500 text-white text-2xl tracking-[0.35em] font-light uppercase bg-black/50 hover:bg-black/60"
            onClick={() => alert("edit")}
          >
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
}