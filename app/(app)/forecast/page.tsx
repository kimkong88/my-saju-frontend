"use client";

import { useState } from "react";
import { Tabs } from "@heroui/react";
import ForecastHero from "@/components/forecast-page/ForecastHero";
import TomorrowTab from "@/components/forecast-page/TomorrowTab";
import FourteenDayTab from "@/components/forecast-page/FourteenDayTab";
import ResponsiveLayout from "@/components/layout/ResponsiveLayout";

// Mock data - will be replaced with API calls
import { mockTomorrowForecast } from "@/lib/mock-data/forecast";

export default function ForecastPage() {
    const [activeTab, setActiveTab] = useState<string>("tomorrow");

    return (
        <div className="space-y-0 overflow-x-hidden">
            {/* Hero Section */}
            <ForecastHero />

            {/* Tabs Navigation */}
            <ResponsiveLayout>
                <div className="pt-8 md:pt-12 pb-6 md:pb-8">
                    <Tabs
                        selectedKey={activeTab}
                        onSelectionChange={(key) => setActiveTab(key as string)}
                        className="w-full"
                    >
                        <Tabs.ListContainer>
                            <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                                <Tabs.List className="w-full border-b border-slate-200 rounded-none !bg-transparent !p-0 !shadow-none min-w-max md:min-w-0">
                                    <Tabs.Tab
                                        key="tomorrow"
                                        id="tomorrow"
                                        className="text-sm font-medium text-slate-500 data-[selected=true]:text-slate-900 !h-auto !w-auto !rounded-md !bg-transparent px-4 py-3 relative whitespace-nowrap"
                                    >
                                        Tomorrow
                                        <Tabs.Indicator className="!bg-slate-900 !rounded-none !h-0.5 !bottom-0 !top-auto !absolute !left-0 !right-0" />
                                    </Tabs.Tab>
                                    <Tabs.Tab
                                        key="monthly"
                                        id="monthly"
                                        className="text-sm font-medium text-slate-500 data-[selected=true]:text-slate-900 !h-auto !w-auto !rounded-md !bg-transparent px-4 py-3 relative whitespace-nowrap"
                                    >
                                        Next 14 Days
                                        <Tabs.Indicator className="!bg-slate-900 !rounded-none !h-0.5 !bottom-0 !top-auto !absolute !left-0 !right-0" />
                                    </Tabs.Tab>
                                </Tabs.List>
                            </div>
                        </Tabs.ListContainer>

                        {/* Tab Panels */}
                        <Tabs.Panel key="tomorrow" id="tomorrow" className="!overflow-visible">
                            <TomorrowTab data={mockTomorrowForecast} onTabSwitch={(tab) => setActiveTab(tab)} />
                        </Tabs.Panel>
                        <Tabs.Panel key="monthly" id="monthly" className="!overflow-visible">
                            <FourteenDayTab 
                                myElement="FIRE-I"
                                myElementEmoji="🔥"
                            />
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </ResponsiveLayout>
        </div>
    );
}
