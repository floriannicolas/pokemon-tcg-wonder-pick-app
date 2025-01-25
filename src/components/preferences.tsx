"use client";

import { useLocalStorage } from 'usehooks-ts';
import { Button } from "@/components/ui/button";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Booster } from "@/lib/definitions";
import { Menu } from "lucide-react";

const PreferencesFormSchema = z.object({
    booster: z.enum([
        "random",
        Booster.A1_CHARIZARD,
        Booster.A1_MEWTWO,
        Booster.A1_PIKACHU,
        Booster.A1A_MEW,
    ], {
        required_error: "You need to select a booster type.",
    }),
});

export const PREFERENCES_BOOSTER_KEY = 'preferences-booster';

export default function Preferences({
    onSave,
}: {
    onSave: (selectedBooster: Booster | 'random') => void,
}) {
    const [preferredBooster, setPreferredBooster] = useLocalStorage<Booster | 'random'>(PREFERENCES_BOOSTER_KEY, 'random');
    const form = useForm<z.infer<typeof PreferencesFormSchema>>({
        resolver: zodResolver(PreferencesFormSchema),
        defaultValues: {
            booster: preferredBooster,
        },
    });

    function onSubmit(data: z.infer<typeof PreferencesFormSchema>) {
        console.log('submitPreferences', data);
        setPreferredBooster(data.booster);
        onSave(data.booster);
    }

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="absolute top-3 right-3 rounded-full size-12" variant="outline" size="icon">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Preferences</SheetTitle>
                        <SheetDescription>
                            Make changes to your preferences here. Click save when you&apos;re done.
                        </SheetDescription>
                    </SheetHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4">
                            <FormField
                                control={form.control}
                                name="booster"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Booster type</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="random" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Random booster
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value={Booster.A1_CHARIZARD} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        A1 - Charizard
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value={Booster.A1_MEWTWO} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        A1 - Mewtwo
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value={Booster.A1_PIKACHU} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        A1 - Pikachu
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value={Booster.A1A_MEW} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        A1A - Mew
                                                    </FormLabel>
                                                </FormItem>

                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit">Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </form>
                    </Form>
                </SheetContent>
            </Sheet>
        </>
    );
}
