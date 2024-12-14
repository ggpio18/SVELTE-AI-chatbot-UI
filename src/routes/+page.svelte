<script>
	import { fly, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';

	let messages = [];
	let newMessage = '';
	let chatContainer;
	let isTyping = false;

	const botResponses = [
		"I'm here to help! What would you like to know?",
		"That's an interesting question. Let me think about it...",
		"I understand what you're asking. Here's what I think...",
		"Great question! Here's my perspective on that...",
		"I'd be happy to help you with that!"
	];

	function scrollToBottom() {
		setTimeout(() => {
			chatContainer?.scrollTo({
				top: chatContainer.scrollHeight,
				behavior: 'smooth'
			});
		}, 100);
	}

	async function handleSubmit() {
		if (!newMessage.trim()) return;

		// Add user message
		messages = [...messages, { text: newMessage, isUser: true, id: Date.now() }];
		scrollToBottom();
		const userMessage = newMessage;
		newMessage = '';

		// Show typing indicator
		isTyping = true;
		scrollToBottom();

		// Simulate AI thinking and typing
		await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));

		// Add bot response
		const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
		messages = [...messages, { text: randomResponse, isUser: false, id: Date.now() }];
		isTyping = false;
		scrollToBottom();
	}

	// Animate the avatar on hover
	const avatarSpring = spring({ x: 0, y: 0 }, {
		stiffness: 0.1,
		damping: 0.15
	});

	function handleMouseMove(event) {
		const { clientX, clientY, target } = event;
		const { left, top, width, height } = target.getBoundingClientRect();
		const x = (clientX - left - width / 2) / 10;
		const y = (clientY - top - height / 2) / 10;
		avatarSpring.set({ x, y });
	}
</script>

<svelte:head>
	<title>AI Chatbot</title>
</svelte:head>

<div class="flex flex-col h-screen bg-gray-100">
	<header class="bg-white shadow-sm p-4">
		<div class="max-w-4xl mx-auto flex items-center gap-4">
			<div 
				class="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
				on:mousemove={handleMouseMove}
				style="transform: translate({$avatarSpring.x}px, {$avatarSpring.y}px)"
			>
				<span class="text-white text-xl font-bold">AI</span>
			</div>
			<h1 class="text-xl font-semibold text-gray-800">AI Assistant</h1>
		</div>
	</header>

	<main class="flex-1 overflow-hidden">
		<div class="max-w-4xl mx-auto h-full flex flex-col">
			<div 
				class="flex-1 overflow-y-auto p-4 space-y-4"
				bind:this={chatContainer}
			>
				{#each messages as message (message.id)}
					<div
						animate:flip
						class="flex {message.isUser ? 'justify-end' : 'justify-start'}"
					>
						<div
							class="max-w-[80%] rounded-lg p-4 {message.isUser ? 'bg-purple-500 text-white' : 'bg-white'} shadow-md"
							in:fly="{{ y: 20, duration: 300 }}"
						>
							<p class="text-sm md:text-base">{message.text}</p>
						</div>
					</div>
				{/each}

				{#if isTyping}
					<div
						class="flex justify-start"
						in:fade
					>
						<div class="bg-white rounded-lg p-4 shadow-md">
							<div class="flex space-x-2">
								<div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0ms"></div>
								<div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 150ms"></div>
								<div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 300ms"></div>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<form 
				class="p-4 bg-white border-t"
				on:submit|preventDefault={handleSubmit}
			>
				<div class="max-w-4xl mx-auto flex gap-4">
					<input
						type="text"
						bind:value={newMessage}
						placeholder="Type your message..."
						class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-purple-500"
					/>
					<button
						type="submit"
						class="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
					>
						Send
					</button>
				</div>
			</form>
		</div>
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>