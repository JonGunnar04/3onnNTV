import { useState } from "react";
import { Input } from "./input";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export function ShopCard() {
 const [input, setInput] = useState('input text value here')
  return (
    <Card>
        <CardHeader>
            <CardTitle>Shopping card</CardTitle>
            <CardDescription>No dart here</CardDescription>
            <CardAction>Button?</CardAction>
        </CardHeader>
        <CardContent>
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
            <p>Card Content</p>
        </CardContent>
        <CardFooter>
            <p>Card Footer</p>
        </CardFooter>
    </Card>
  );
}