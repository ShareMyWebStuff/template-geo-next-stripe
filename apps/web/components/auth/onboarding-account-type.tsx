"use client";

import { z } from "zod";
// import { onboardingSchema } from "@/schemas/auth/onboarding";
import { OnboardingAccountTypeSchema, onboardingAccountTypeSchema } from "@/schemas/auth/onboarding";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "../ui/separator";
import { useOnboardingStore } from "@/app/(auth)/onboarding/store";
import { useRouter } from "next/navigation";
import { AccountTypeValues } from "@/constants/account-type";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";


export default function OnboardingAccountTypeForm() {
    const router = useRouter();

    const accountType = useOnboardingStore((state) => state.accountType);
    const setData = useOnboardingStore((state) => state.setData);

    console.log (`Account Type ${accountType}`)
    console.log (`Account Type ${accountType}`)

    const headerLabel = "Account Type";
    const subHeader = "Select the type of account you are looking for.";

    const form = useForm<OnboardingAccountTypeSchema>({
        resolver: zodResolver(onboardingAccountTypeSchema),
        defaultValues: {
            accountType: accountType || AccountTypeValues.NotSelected 
        },
    });

    const onSubmit = (data: OnboardingAccountTypeSchema) => {
        console.log({
            ...data,
            accountType
        });
        setData(data);
        router.push("/onboarding/name");
    };

    return (

    <Card className="border-blue w-full max-w-2lg">
        <CardHeader className="text-center ">
            <CardTitle className="text-xl text-blue">{headerLabel}</CardTitle>
            <CardDescription className="my-2 text-blue">{subHeader}</CardDescription>
            <Separator className="my-2" />
        </CardHeader>
        <CardContent>
            <Form {...form} >
                <form  className="space-y-6 mt-4" onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                        control={form.control}
                        name="accountType"
                        render={({ field }) => (
                        
                        <FormItem>
                            <FormControl>
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="grid gap-3"
                                >
                                    <div className="group rounded-xl border p-4 transition
                                                    hover:bg-accent
                                                    has-[:checked]:border-blue
                                                    has-[:checked]:bg-off-white">

                                        <Label
                                        htmlFor="r1"
                                        className="cursor-pointer flex gap-3 items-start"
                                        >
                                            <RadioGroupItem
                                                value={AccountTypeValues.Parent}
                                                id="r1"
                                                className="mt-[2px]"
                                            />

                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium leading-tight">
                                                Parent / Guardian
                                                </span>
                                                <span className="text-sm text-muted-foreground leading-snug">
                                                Im a parent / guardian looking to find a tutor for my children.
                                                </span>
                                            </div>
                                        </Label>
                                    </div>

                                    <div className="group rounded-xl border p-4 transition
                                                    hover:bg-accent
                                                    has-checked:border-blue
                                                    has-checked:bg-off-white">

                                        <Label
                                        htmlFor="r2"
                                        className="cursor-pointer flex gap-3 items-start"
                                        >
                                            <RadioGroupItem
                                                value={AccountTypeValues.Student}
                                                id="r2"
                                                className="mt-[2px]"
                                            />

                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium leading-tight">
                                                Student
                                                </span>
                                                <span className="text-sm text-muted-foreground leading-snug">
                                                Im a student looking to find a tutor or work with one a tutor I have found.
                                                </span>
                                            </div>
                                        </Label>                                                        

                                    </div>

                                    <div className="group rounded-xl border p-4 transition
                                                    hover:bg-accent
                                                    has-checked:border-blue
                                                    has-checked:bg-off-white">
                                        <Label
                                        htmlFor="r3"
                                        className="cursor-pointer flex gap-3 items-start"
                                        >
                                            <RadioGroupItem
                                                value={AccountTypeValues.Tutor}
                                                id="r3"
                                                className="mt-0.5"
                                            />

                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium leading-tight">
                                                Tutor
                                                </span>
                                                <span className="text-sm text-muted-foreground leading-snug">
                                                Im a tutor looking to run my bisiness, host courses and / or connect with students.
                                                </span>
                                            </div>
                                        </Label>                                                        

                                    </div>
                                </RadioGroup>
                            </FormControl>

                            <FormMessage className="text-blue border border-blue bg-off-white rounded p-2" />
                        </FormItem>
                        )}
                    />

                    <div className="mt-12 flex justify-end md:col-span-2">

                        <Button variant="blueWhiteFull" className="" type="submit">
                            Continue
                        </Button>

                    </div>

                </form>
            </Form>
        </CardContent>
      </Card>

  );
}
