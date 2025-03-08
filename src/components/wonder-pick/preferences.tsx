"use client";

import { useLocalStorage } from 'usehooks-ts';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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


const BoosterValues = Object.values(Booster);

const PreferencesFormSchema = z.object({
    booster: z.enum([
        'random',
        ...BoosterValues,
    ], {
        required_error: "You need to select a booster type.",
    }),
    onlyGodPack: z.boolean(),
});

export const PREFERENCES_WONDER_PICK_BOOSTER_KEY = 'preferences-wonder-pick-booster';
export const PREFERENCES_WONDER_PICK_ONLY_GOD_PACK_KEY = 'preferences-wonder-pick-only-god-pack';

export default function Preferences({
    onSave,
}: {
    onSave: (selectedBooster: Booster | 'random', onlyGodPack: boolean) => void,
}) {
    const [preferredBooster, setPreferredBooster] = useLocalStorage<Booster | 'random'>(PREFERENCES_WONDER_PICK_BOOSTER_KEY, 'random');
    const [onlyGodPack, setOnlyGodPack] = useLocalStorage<boolean>(PREFERENCES_WONDER_PICK_ONLY_GOD_PACK_KEY, false);
    const form = useForm<z.infer<typeof PreferencesFormSchema>>({
        resolver: zodResolver(PreferencesFormSchema),
        defaultValues: {
            booster: preferredBooster,
            onlyGodPack: onlyGodPack,
        },
    });

    /**
     * On submit preferences form.
     *
     * @param data form data
     */
    function onSubmit(data: z.infer<typeof PreferencesFormSchema>) {
        console.log('submitPreferences', data);
        setPreferredBooster(data.booster);
        setOnlyGodPack(data.onlyGodPack);
        onSave(data.booster, data.onlyGodPack);
    }

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="absolute top-3 right-3 rounded-full size-12" variant="outline" size="icon">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent className='flex flex-col overflow-y-auto'>
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
                                        <FormLabel>Booster type:</FormLabel>
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
                                                        Random
                                                    </FormLabel>
                                                </FormItem>
                                                {Object.entries(Booster).map(([key, value]) => {
                                                    const [boosterEdition, boosterLabel] = key.split('_');
                                                    const boosterLabelCapitalized = `${boosterLabel.charAt(0).toUpperCase()}${boosterLabel.slice(1).toLowerCase()}`;
                                                    return (
                                                        <FormItem key={key} className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value={value} />
                                                            </FormControl>
                                                            <FormLabel className="font-normal flex gap-2 items-center">
                                                                <div className="h-8 w-4 bg-contain bg-no-repeat" style={{ backgroundImage: `url('/boosters/${value}.webp')` }} />
                                                                <span className="font-bold">{boosterEdition}</span> - {boosterLabelCapitalized}
                                                            </FormLabel>
                                                        </FormItem>
                                                    );
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="onlyGodPack"
                                render={({ field }) => (
                                    <FormItem className="flex gap-2 items-center">
                                        <FormLabel>Pick only God Packs:</FormLabel>
                                        <FormControl>
                                            <Switch
                                                className="mt-0!"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
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
                    <div className='text-sm mt-auto'>
                        <span className='font-bold'>Disclaimer:</span> This is a fan-made project and is not affiliated with, sponsored, or endorsed by Nintendo, The Pokémon Company, or Game Freak.
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
