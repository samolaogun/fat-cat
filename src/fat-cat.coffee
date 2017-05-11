class fatCat

	@sSize = window.innerWidth
	@units: [
		'rem'
		'em'
		'vw'
		'vh'
		'px'
		'%'
	]

	constructor: (@elements, @props, @pairs, @opts) ->
		if !Array.isArray @props then @props = [@props]
		if !Array.isArray @elements then @elements = [@elements]

		@unit = @opts?.unit ? 'px'
		@clamp = @opts?.clamp ? true

		if !fatCat.units.includes @unit
			throw 'fatCat: Incompatible units.'
		if @pairs.length < 2
			throw 'fatCat: A minimum of two pairs is required.'

		@pairs.sort (a, b) ->
			if a[1] > b[1] then return 1
			else if a[1] < b[1] then return -1
			0

		@filteredPairs = @pairs.filter (p) -> p[1] < fatCat.sSize

		if @filteredPairs.length is 0
			@current = [@pairs[0], @pairs[1]]
		else if @filteredPairs.length == @pairs.length
			[..., beforeLast, last] = @filteredPairs
			@current = [beforeLast, last]
		else
			[..., below] = @filteredPairs
			above = @pairs[@filteredPairs.length]
			@current = [below, above]

		@current = [
			[@current[0][1], @current[1][1]]
			[@current[0][0], @current[1][0]]
		]

		[a1, a2] = @current[0]
		[b1, b2] = @current[1]
		@value = b1 + (fatCat.sSize - a1) * (b2 - b1) / (a2 - a1)

		if @clamp
			if @value > b2 then @value = b2
			else if @value < b1 then @value = b1

		for el in @elements
			if typeof el is 'string'
				el = document.querySelectorAll el

				for item in el
					item.style[prop] = @value + @unit for prop in @props
			else
				el.style[prop] = @value + @unit for prop in @props

module?.exports = fatCat;
